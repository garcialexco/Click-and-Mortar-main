# Airtable form sync setup

Click & Mortar's Netlify Forms remain the public-facing forms. A Netlify event function listens for verified `Local Visibility Check` submissions and writes them into Airtable.

## Airtable destination

Base: `Leads`

Website submissions create:
- a record in **Leads** with Pipeline Stage = `Audit Requested` and Lead Source = `Website Form`
- a linked record in **Visibility Checks** with Status = `Requested`

The Visibility Checks table is the fulfillment template for the free audit:
- Google Presence
- Reviews & Reputation
- Website Conversion
- Local Visibility
- Top 3 Opportunities
- Recommended Next Step
- Internal Notes

## One required Netlify secret

Create an Airtable Personal Access Token that has record-write access to the Leads base. Do not commit it to GitHub.

In Netlify, add:

`AIRTABLE_TOKEN=<your Airtable personal access token>`

Use the Functions scope if your plan supports scoped environment variables. Otherwise the default/all scope is okay.

After adding or changing the environment variable, trigger a new deploy so the function receives the updated value.

## Test

After deploy, submit either Local Visibility Check form on the website with a real-looking test entry. Confirm that:
1. the Netlify form submission is accepted,
2. a Lead appears in Airtable,
3. a linked Visibility Check appears in Airtable,
4. the Submission Page says either Homepage or Contact Page.

Then delete the test records.
