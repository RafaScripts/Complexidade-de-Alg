# Trabalho Complexidade de Algoritimos
### Autor: Rafael Santos Freire

## Introdução
O seguinte trabalho visa demonstrar alguns exemplos de complexidade de algoritimos, utilizando a linguagem de programação TypeScript.

## Instalação
Para executar o projeto, é necessário ter o NodeJS instalado na sua máquina. Para isso basta acessar o site oficial do NodeJS e seguir as instruções de instalação ou caso queira
um gestão melhor das verções do node, pode utilizar o NVM.

(Assista ao video para melhor entendimento: https://youtu.be/ukGvRLK9PUA)

**NVM (Node Version Manager)**<br>
A instalação demonstrada é para linux muda sua instalação de acordo com o seu sistema operacional. Em caso de
outros sismtemas recomenda-se a instalação pelo site oficial do NodeJS.

instalação basica nativa:
```bash
sudo apt-get update

sudo apt-get install nodejs
```

### Instalação das dependências
Para instalar as dependências do projeto, basta executar o comando abaixo no terminal:
```bash
npm install
```
ou
```bash
yarn install
```
* para utilizar o yarn nescessario sua instalação global previa.*
```bash 
npm install -g yarn 
```

## Execução
Para executar o projeto, basta executar o comando abaixo no terminal:
```bash
npm start
```
ou
```bash
yarn start
```

## exemplos
### Exemplo 1
O primeiro algoritimo a ser executado é o algoritimo para gerar cadastros de usuários com dados aleatórios. O algoritimo gera 1000 cadastros
(pode ser alterado para mais ou para menos em `src/server.ts` na linha 6 alterando o valor da variavel `totalUsers`). O mesmo algoritimo possui
uma complexidade constante (O(N)), onde N é o número total de usuários a serem criados. Isso ocorre porque há apenas um loop que itera sobre o número total de usuários a serem criados.

```ts
export const totalUsers = 2200;

...

interface user {
  user_id: string;
  name: string;
  email: string;
  password_hash: string;
  totalDevices: number;
}

...

const users = [];

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
```

### Exemplo 2
O segundo algoritimo a ser executado é o algoritimo para gerar cadastros de dispositivos com dados aleatórios. O algoritimo gera N dispositivos a
depender da quantidade de dispositivos cadastrados por cada usúario (Valor aleatório não maior que 10 dispositivos por usuário). o mesmo algoritimo também gerá
40 ultimas localizações para cada dispositivo cadastrado. O mesmo algoritimo possui uma complexidade polinomial ( O(NML) ), onde N é o número total de usuários, M é o número total de dispositivos por usuário e L é o número das últimas posições armazenadas para cada dispositivo. Existem três loops aninhados. O primeiro loop itera sobre os usuários, o segundo loop itera sobre o número de dispositivos por usuário e o terceiro loop itera sobre a última matriz de posições.
```ts
...

export let totalDevices = 0;

...

enum status {
  'online',
  'offline',
  'disabled'
}

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

...

const devices = [];

...

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
```

#### extra:
O(NML) não é uma complexidade exponencial ou fatorial, mas sim uma complexidade polinomial.

Uma complexidade de tempo exponencial, como O(2^N), cresce muito mais rápido do que uma complexidade de tempo polinomial à medida que o tamanho da entrada aumenta. Em uma complexidade de tempo exponencial, o tempo necessário para resolver um problema dobra para cada entrada adicional, tornando-o impraticável para grandes entradas.

Uma complexidade de tempo fatorial, como O(N!), cresce ainda mais rápido do que uma complexidade de tempo exponencial. Em uma complexidade de tempo fatorial, o tempo necessário para resolver um problema aumenta em um fator de N para cada entrada adicional, tornando-o ainda mais impraticável para grandes entradas.

Em contraste, uma complexidade de tempo polinomial, como O(NML), cresce a uma taxa muito mais lenta do que uma complexidade de tempo exponencial ou fatorial. Embora a complexidade de tempo polinomial ainda possa ser impraticável para entradas muito grandes, geralmente é mais gerenciável do que a complexidade de tempo exponencial ou fatorial.

(** comentario do aluno **<br>
Ao meu ver uma compĺexidade polinomial pode ser vista como uma complexidade exponencial a depender do caso, mas claro sua classificação real é ser mais "Rapida" que uma Exponencial ou Fatorial
Citando o trabalho do Prof. Dr. Osvaldo Luiz de Oliveira: 

"Todo problema para o qual existe um algoritmo
polinomial é dito ser tratável.<br>
Inversamente, o problema é dito ser intratável"
)

### Exemplo 3
O terceiro algoritimo a ser executado executa um calculo de distancia entre dois pontos geograficos. Tendo como base as ultimas posições registradas em cada dispositivo e calcula suas distancias em Km.
O algoritimo possui uma complexidade Cubica (O(N^3)), onde n é o número total de dispositivos e o número de latitudes e longitudes para cada dispositivo. Isso ocorre porque o código usa três loops for aninhados para iterar sobre cada dispositivo, usuário e par de latitude e longitude, resultando em uma complexidade de tempo O(n^3). No entanto, a complexidade da função calculateDistance, que é chamada dentro dos loops for aninhados, é o tempo constante ou O(1), pois ela executa apenas operações aritméticas simples e funções trigonométricas.

```ts
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
```

#### Referencias:
http://www.faccamp.br/osvaldo/ClassesComplexidadeProblemas.pdf - Acessado no dia - 03/04/2023;
https://pt.wikipedia.org/wiki/P_(complexidade) - Acessado no dia - 03/04/2023;


###### todos os direitos autoriais sobre o codigo deste trabalho estão reservados ao autor.