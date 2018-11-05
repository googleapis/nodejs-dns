/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

async function listZones() {
  // [START dns_list_zones]
  // Imports the Google Cloud client library
  const {DNS} = require('@google-cloud/dns');

  // Creates a client
  const dns = new DNS();

  // Lists all zones in the current project
  const [zones] = await dns.getZones();
  console.log('Zones:');
  zones.forEach(zone => console.log(zone.name));
  // [END dns_list_zones]
}

require(`yargs`)
  .demand(1)
  .command(`list`, `Lists all zones in the current project.`, {}, listZones)
  .example(`node $0 list`, `Lists all zones in the current project.`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/dns/docs`)
  .help()
  .strict().argv;
