const AIRTABLE_BASE_ID = "appesL7Yeq54kp8tz";
const LEADS_TABLE_ID = "tblmsWHkmjUVvOK5e";
const VISIBILITY_CHECKS_TABLE_ID = "tblZ30zb0JrlTyKoD";

const LEAD_FIELDS = {
  name: "fldoIGiVfuwZlkL2c",
  website: "fldsB0TpHlrXoJhCI",
  email: "fldQBvCaGgz8jFkvf",
  phone: "fldJp4eJI3rdjYBKS",
  message: "fldYLTOgmJdF05c7b",
  pipelineStage: "fldrjg96HDL0pS9Q9",
  leadSource: "fldAEjoyQNZWx5k7o",
  businessName: "fldC6OnN0IdI2IbrT",
};

const CHECK_FIELDS = {
  checkName: "fldUYMrZFkDup9HVA",
  lead: "fld5vYZv2CJpYniEv",
  businessName: "fldGRGNpSdTd7jFQZ",
  websiteListing: "fldxQgIf70xn0xqyW",
  status: "fldkFga7fY8tv7jIY",
  internalNotes: "fldo9lNK706FdZgPA",
};

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeUrl(value) {
  if (!value) return "";
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(candidate).toString();
  } catch {
    return "";
  }
}

async function createAirtableRecord(tableId, fields) {
  const token = process.env.AIRTABLE_TOKEN;

  if (!token) {
    throw new Error(
      "AIRTABLE_TOKEN is missing. Add it in Netlify Project configuration > Environment variables with Functions scope."
    );
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields }],
        typecast: true,
      }),
    }
  );

  const body = await response.json();

  if (!response.ok || !body.records?.[0]) {
    throw new Error(
      `Airtable write failed (${response.status}): ${JSON.stringify(body)}`
    );
  }

  return body.records[0];
}

export default {
  async formSubmitted(event) {
    const data = event?.data || {};

    // Ignore any future forms that are not the Click & Mortar visibility-check form.
    if (
      data["form-name"] &&
      data["form-name"] !== "Local Visibility Check"
    ) {
      return;
    }

    // Belt-and-suspenders spam check. Netlify already verifies form submissions.
    if (clean(data["bot-field"])) {
      return;
    }

    const name = clean(data.name);
    const email = clean(data.email);
    const phone = clean(data.phone);
    const business = clean(data.business);
    const listing = clean(data.Message || data.message);

    if (!name || !email || !business) {
      console.warn("Skipping incomplete Local Visibility Check submission.", {
        name: Boolean(name),
        email: Boolean(email),
        business: Boolean(business),
      });
      return;
    }

    const leadFields = {
      [LEAD_FIELDS.name]: name,
      [LEAD_FIELDS.email]: email,
      [LEAD_FIELDS.businessName]: business,
      [LEAD_FIELDS.pipelineStage]: "Audit Requested",
      [LEAD_FIELDS.leadSource]: "Website Form",
    };

    if (phone) leadFields[LEAD_FIELDS.phone] = phone;
    if (listing) {
      leadFields[LEAD_FIELDS.website] = listing;
      leadFields[LEAD_FIELDS.message] = listing;
    }

    const lead = await createAirtableRecord(LEADS_TABLE_ID, leadFields);

    const normalizedUrl = normalizeUrl(listing);
    const checkFields = {
      [CHECK_FIELDS.checkName]: `${business} — Website Request`,
      [CHECK_FIELDS.lead]: [lead.id],
      [CHECK_FIELDS.businessName]: business,
      [CHECK_FIELDS.status]: "Requested",
      [CHECK_FIELDS.internalNotes]: listing
        ? `Created automatically from the Click & Mortar website form. Submitted listing/site: ${listing}`
        : "Created automatically from the Click & Mortar website form.",
    };

    if (normalizedUrl) {
      checkFields[CHECK_FIELDS.websiteListing] = normalizedUrl;
    }

    await createAirtableRecord(VISIBILITY_CHECKS_TABLE_ID, checkFields);

    console.log("Synced Local Visibility Check submission to Airtable.", {
      leadRecordId: lead.id,
      business,
    });
  },
};
