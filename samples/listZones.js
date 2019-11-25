// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// sample-metadata:
//   name: List Zones
//   description: Lists all zones in the current project.
//   usage: node listZones

async function main() {
  // [START dns_list_zones]
  // Imports the Google Cloud client library
  const {DNS} = require('@google-cloud/dns');

  // Creates a client
  const dns = new DNS();

  async function listZones() {
    // Lists all zones in the current project
    const [zones] = await dns.getZones();
    console.log('Zones:');
    zones.forEach(zone => console.log(zone.name));
  }
  listZones();
  // [END dns_list_zones]
}

main();
