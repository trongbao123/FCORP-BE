const { Client } = require("@elastic/elasticsearch")
const { DomainElecticSearch } = require("../util/setting")
const DbConFig = new Client({ node: DomainElecticSearch })

module.exports = DbConFig
