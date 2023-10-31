/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker';
import { PrismaClient, Prisma, AppType } from '@prisma/client';

const prisma = new PrismaClient();

const appTypes: string[] = ['EXE', 'DELPHI', 'MOBILE', 'WEB_APP'];

const applicationsList: Prisma.ApplicationCreateInput[] = []

for (let i = 0; i < 44; i++) {
	const appTypeIndex = i % appTypes.length;
	const appType = appTypes[appTypeIndex] as AppType;

	applicationsList.push({
    name: faker.company.name(),
    app_type: appType,
    description: faker.company.catchPhrase(),
  })
}

const applicationsData: Prisma.ApplicationCreateInput[] = applicationsList

async function main() {
  
  console.log('Delete applications...');

  await prisma.application.deleteMany();
 
  console.log('All applications deleted'); 
  console.log('Start seeding...');

  for (const application of applicationsData) {
    const applicationSeed = await prisma.application.create({
      data: application
    });

    console.log(`Created application: ${applicationSeed.name}`);
  }

  console.log('Seeding Finished');
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (error) => {
  console.log('Applications Seeds Error: ', error);
  await prisma.$disconnect;
  process.exit(1);
})
