using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert into Makes (Name) Values ('Make1')");
            migrationBuilder.Sql("Insert into Makes (Name) Values ('Make2')");
            migrationBuilder.Sql("Insert into Makes (Name) Values ('Make3')");

            migrationBuilder.Sql(@"Insert into Models (Name, MakeId) Values ('Make1-ModelA',
                (select id from makes where Name='Make1'))");
            migrationBuilder.Sql(@"Insert into Models (Name, MakeId) Values ('Make1-ModelB',
                (select id from makes where Name='Make1'))");
            migrationBuilder.Sql(@"Insert into Models (Name, MakeId) Values ('Make1-ModelC',
            	(select id from makes where Name='Make1'))");

            migrationBuilder.Sql(@"Insert into Models (Name, MakeId) Values ('Make2-ModelA',
            	(select id from makes where Name='Make2'))");
            migrationBuilder.Sql(@"Insert into Models (Name, MakeId) Values ('Make2-ModelB',
            	(select id from makes where Name='Make2'))");
            migrationBuilder.Sql(@"Insert into Models (Name, MakeId) Values ('Make2-ModelC',
            	(select id from makes where Name='Make2'))");

            migrationBuilder.Sql(@"Insert into Models (Name, MakeId) Values ('Make3-ModelA',
            	(select id from makes where Name='Make3'))");
            migrationBuilder.Sql(@"Insert into Models (Name, MakeId) Values ('Make3-ModelB',
            	(select id from makes where Name='Make3'))");
            migrationBuilder.Sql(@"Insert into Models (Name, MakeId) Values ('Make3-ModelC',
            	(select id from makes where Name='Make3'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "Delete from Makes where Name in ('Make1', 'Make2', 'Make3')");
        }
    }
}
