//import express from 'express';
import { faker } from '@faker-js/faker';
import fs from 'fs';

//quantidade de usuarios a serem criados
export const totalUsers = 1000;

//a seguir usado apenas para testes de performance
//quantidade de dispositivos
export let totalDevices = 0;
//quantidade de calculos de distancia
export let totalAllDistances = 0;

console.log(`tempos de execução fixos, para testes de performance foram calculados com ${totalUsers} usuarios\n em uma maquina com as seguintes configurações:\n 8GB RAM\n 2.4GHz Intel Core i5\n 256GB SSD\n\nOs tempos de execução podem variar de acordo com a maquina que for executar o código.\n\n`);

/* Interface for the user object
  * @param user_id: string The user's id
  * @param name: string The user's name
  * @param email: string The user's email
  * @param password_hash: string The user's password
  * @param totalDevices: number The number of devices the user has
*/
interface user {
  user_id: string;
  name: string;
  email: string;
  password_hash: string;
  totalDevices: number;
}

/* Enum for the status of the device
  * @param online: string The device is online
  * @param offline: string The device is offline
  * @param disabled: string The device is disabled
*/
enum status {
  'online',
  'offline',
  'disabled'
}

/* Interface for the device object
  * @param code: string The device's code
  * @param status: status The device's status
  * @param lastLat: string The device's last latitude
  * @param lastLng: string The device's last longitude
  * @param lastTime: Date The device's last time
  * @param simCard: string The device's sim card
  * @param allLatsAndLngs: Array<{ lat: string, lng: string }> The device's all latitudes and longitudes
  * @param allTimes: number[] The device's all times
  * @param createdAt: Date The device's creation date
  * @param updatedAt: Date The device's update date
  * @param userLinked: string The device's user id
 */
interface device {
  code: any;
  userLinked: any;
  status: any;
  lastLat: any;
  lastLng: any;
  lastTime: any;
  simCard: string;
  allLatsAndLngs: any;
  allTimes: any;
  createdAt: any;
  updatedAt: any;
}

const users = [];
const devices = [];
/**
 * The createUser function takes in a user object and adds it to the users array.
 * @param user: user Tell the function what type of data to expect
* @return A boolean
*/
export function createUser(user: user) {
  users.push(user);
  //console.log(users);
  return true;
}

const executesUsers = [];
const executesDevices = [];

const timeExecute1 = Date.now();

/**
 * The execute1 function creates a user and returns the user's id.
 *
 * @return The number of users created
 */
export function execute1(){
  for (let i = 0; i < totalUsers; i++) {
    executesUsers.push(createUser({
      user_id: faker.random.alphaNumeric(10),
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password_hash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      totalDevices: Math.floor(Math.random() * 10)
    }));
  }

  Promise.all(executesUsers).then(() => {
    //console.log('done');
  });

  return users.length;
}

execute1();

const timeExecute2 = Date.now();

console.log('Tempo de Execução: ' + ((timeExecute2 - timeExecute1) / 1000).toFixed(2) + ' Secs');
debugger;

const timeExecute3 = Date.now();

/**
 * The createDevice function creates a new device object and adds it to the devices array.
 * @param device Create a device object
 *
 * @return A boolean
 */
function createDevice(device : device) {
  devices.push(device);
  return true;
}

//

/**
 * The execute2 function creates a list of devices and then inserts them into the database.
 * O^(NML);
 * @return A promise
 */
export function execute2(){
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const lastsPositions = [];
    for (let j = 0; j < 40; j++) {
      lastsPositions.push({
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      });
    }
    //console.log(lastsPositions);

    for (let j = 0; j < user.totalDevices; j++) {
      const device = {
        userLinked: user.user_id.toString(),
        code: faker.random.alphaNumeric(10),
        status: status[Math.floor(Math.random() * 3)],
        lastLat: faker.address.latitude(),
        lastLng: faker.address.longitude(),
        lastTime: faker.date.past().getTime(),
        simCard: faker.phone.number(),
        altitude: Math.floor(Math.random() * 1000),
        speed: Math.floor(Math.random() * 100),
        hodp: Math.floor(Math.random() * 10),
        vodp: Math.floor(Math.random() * 10),
        satelites: faker.random.numeric(1),
        allLatsAndLngs: lastsPositions,
        allTimes: lastsPositions.map(() => faker.date.past().getTime()),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
      };
      executesDevices.push(createDevice(device));
    }

    Promise.all(executesDevices).then(() => {
      //console.log('done');
    });

  }

  totalDevices = devices.length;
  return devices.length;
}

execute2();

const timeExecute4 = Date.now();

console.log('Tempo de Execução: ' + ((timeExecute4 - timeExecute3) / 1000).toFixed(2) + ' Secs');

//console.log(devices);

debugger;

const timeExecute5 = Date.now();

/**
 * The deg2rad function converts degrees to radians.
 * @param number: number Specify the type of parameter that will be passed into the function
 * @return The number passed in multiplied by the ratio of pi to 180
 */
function deg2rad(number: number) {
  return number * (Math.PI / 180)
}

/**
 * The calculateDistance function calculates the distance between two points on Earth.
 * @param lat1: number Store the latitude of the first point
 * @param lon1: number Specify the longitude of the first location
 * @param lat2: number Represent the latitude of the second location
 * @param lon2: number Get the longitude of a location
 * @return The distance between two points in kilometers
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

const allDistances = [];


/**
 * The execute3 function calculates the distance between two points on a map.
 * @return The total number of distances calculated
 */
export function execute3(){
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    for (let j = 0; j < devices.length; j++) {
      const device = devices[j];
      if (device.userLinked === user.user_id) {
        //console.log(device);
        //console.log(user);
        for (let k = 0; k < device.allLatsAndLngs.length; k++) {
          const lat1 = parseFloat(device.lastLat);
          const lng1 = parseFloat(device.lastLng);
          const lat2 = parseFloat(device.allLatsAndLngs[k].lat);
          const lng2 = parseFloat(device.allLatsAndLngs[k].lng);
          const distance = calculateDistance(lat1, lng1, lat2, lng2);
          /*if (distance > 1) {
            console.log('distance is greater than 1');
          }*/
          //console.log(distance.toFixed(2) + ' km');
          allDistances.push({
            distance: distance.toFixed(2) + ' km',
            device: device.code,
            user: user.user_id
          });
        }
      }
    }
  }

  totalAllDistances = allDistances.length;

  return allDistances.length;
}

execute3();

const timeExecute6 = Date.now();

console.log('Tempo de Execução: ' + ((timeExecute6 - timeExecute5) / 1000).toFixed(2) + ' Secs');

let index = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Logs</title>
</head>
<body>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
    <h1>Logs dos Tempos de Execução</h1>
    <span>Os logs a seguir foram calculados a partir da Geração de ${totalUsers} Usuarios, com uma máquina com a seguinte configuração:</span>
    <table style="align-items: center; justify-content: center; border: 1px solid #000;">
      <thead style="border: 1px solid #000">
        <tr style="border: 1px solid #000">
          <th style="border: 1px solid #000">Processador</th>
          <th style="border: 1px solid #000">Memória RAM</th>
          <th style="border: 1px solid #000">Disco Rígido</th>
        </tr>
      </thead>
      <tbody style="border: 1px solid #000">
        <tr style="border: 1px solid #000">
          <td style="border: 1px solid #000">Intel Core i5-7200U 2.5GHz</td>
          <td style="border: 1px solid #000">8GB</td>
          <td style="border: 1px solid #000">SSD 256GB</td>
        </tr>
      </tbody>
    </table>
    
    <h2>Tempo de Execução do Script</h2>
    
    <ul>
      <li>Tempo de Execução da Geração de Usuarios: ${((timeExecute2 - timeExecute1) / 1000).toFixed(2)} Segundos</li>
      <li>Tempo de Execução da Geração de Dispositivos: ${((timeExecute4 - timeExecute3) / 1000).toFixed(2)} Segundos</li>
      <li>Tempo de Execução do Cálculo de Distâncias: ${((timeExecute6 - timeExecute5) / 1000).toFixed(2)} Segundos</li>
    </ul>
    
    <h2>Outros logs</h2>
    <a href="../results1.html" target="_blank">Logs1</a>
    <a href="../results2.html" target="_blank">Logs2</a>
    <a href="../results3.html" target="_blank">Logs3</a>
  </div>
</body>
</html>
`;

let results1 = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Logs</title>
</head>
<body>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
    <h1>Logs1</h1>
    <ul>
     ${users.map((user : user) => (`
        <li>${user.user_id}</li>
        <li>${user.name}</li>
        <li>${user.email}</li>
        <li>${user.password_hash}</li>
        <li>${user.totalDevices}</li>
      `))}
    </ul>
  </div>
</body>
</html>
`;

let results2 = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Logs2</title>
</head>
<body>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
    <h1>Logs2</h1>
    <ul>
      ${devices.map((device: any) => (`
        <li>${device.code}</li>
        <li>${device.userLinked}</li>
        <li>${device.lastLat}</li>
        <li>${device.lastLng}</li>
        <li>${device.status}</li>
        <li>${device.allLatsAndLngs.map((item: any) => (
          `
            <ul>
              <li>${item.lat}</li>
              <li>${item.lng}</li>
            </ul>
          `))}</li>
        <li>${device.simCard}</li>
        <li>${device.lastTime}</li>
        <li>${device.allTimes.map((item: any) => (
          `
            <ul>
              <li>${item.time}</li>
            </ul>
          `))}</li>
        <li>${device.createdAt}</li>
        <li>${device.updatedAt}</li>
      `))}
    </ul>
</body>
</html>
`;

let results3 = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Logs3</title>
</head>
<body>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
    <h1>Logs3</h1>
    <ul>
      ${allDistances.map((distance: any) => (`
        <li>${distance.device}</li>
        <li>${distance.user}</li>
        <li>${distance.distance}</li>
       `))}
    </ul>
</body>
</html>
`;


/* Generate the logs files
* @param {string} index - index.html
* @param {string} results1 - results1.html
* @param {string} results2 - results2.html
* @param {string} results3 - results3.html
*
* @return {void}
*
*/
fs.writeFile('index.html', index, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

//overwrite the results1.html file
fs.writeFile('results1.html', results1, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

//overwrite the results2.html file
fs.writeFile('results2.html', results2, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

//overwrite the results3.html file
fs.writeFile('results3.html', results3, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

debugger;

console.log(users);
console.log(devices);
console.log(allDistances);

console.log(totalAllDistances);
console.log(totalDevices);

console.log('fim');
