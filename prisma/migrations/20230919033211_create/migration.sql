-- CreateEnum
CREATE TYPE "AppType" AS ENUM ('EXE', 'DELPHI', 'MOBILE', 'WEB_APP', 'LAUNCHER');

-- CreateEnum
CREATE TYPE "VersionType" AS ENUM ('N', 'P');

-- CreateTable
CREATE TABLE "stores" (
    "id" TEXT NOT NULL,
    "id_loja" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "app_type" "AppType" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_version" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "version_type" "VersionType" NOT NULL,
    "remote_path_id" TEXT NOT NULL,
    "release_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "app_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_app_version" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "app_version_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "store_app_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "remote_paths" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "remote_path" TEXT NOT NULL,

    CONSTRAINT "remote_paths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "reade_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stores_id_loja_key" ON "stores"("id_loja");

-- CreateIndex
CREATE UNIQUE INDEX "stores_ip_key" ON "stores"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "applications_name_key" ON "applications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "app_version_file_name_key" ON "app_version"("file_name");

-- CreateIndex
CREATE UNIQUE INDEX "app_version_application_id_version_key" ON "app_version"("application_id", "version");

-- CreateIndex
CREATE UNIQUE INDEX "store_app_version_store_id_application_id_key" ON "store_app_version"("store_id", "application_id");

-- CreateIndex
CREATE UNIQUE INDEX "remote_paths_application_id_key" ON "remote_paths"("application_id");

-- AddForeignKey
ALTER TABLE "app_version" ADD CONSTRAINT "app_version_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_version" ADD CONSTRAINT "app_version_remote_path_id_fkey" FOREIGN KEY ("remote_path_id") REFERENCES "remote_paths"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_app_version" ADD CONSTRAINT "store_app_version_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_app_version" ADD CONSTRAINT "store_app_version_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_app_version" ADD CONSTRAINT "store_app_version_app_version_id_fkey" FOREIGN KEY ("app_version_id") REFERENCES "app_version"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "remote_paths" ADD CONSTRAINT "remote_paths_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
