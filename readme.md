# Project Iceberg

This project took the top prize at the 2018 [ASEAN-Australia Codeathon](https://asean-australia-codeathon.org/). You can find the corresponding front-end code [here](https://github.com/TheCodefatherPartII/iceberg-frontend).

This repository contains the API and data enrichment code for the project, given a set of bank transactions this application will geocode the transactions using 2 levels of enrichment. The enriched data set is then passed to the visualisation tool which overlays the data on a map which also shows a clear picture of chronological progression.

## Enrichment Process

We use a list of Australian suburbs to name match against transaction descriptions. We additionally built some rudimentary integration into [Look Who's Charging](https://lookwhoscharging.com/) which in many cases can map a transaction description to a specific location.

## Next Steps

To implement this sort of technology in a financial institution, it is expected that the platform would make use of additional data sources that would be available within the confines of the systems and databases that are already in place.
