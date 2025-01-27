using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet_API.Migrations
{
    /// <inheritdoc />
    public partial class new1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TemplateId",
                table: "invoices");

            migrationBuilder.AddColumn<bool>(
                name: "isArchived",
                table: "invoices",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "templateName",
                table: "invoices",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_invoices_ClientId",
                table: "invoices",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_invoiceitems_InvoiceId",
                table: "invoiceitems",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_invoiceitems_invoices_InvoiceId",
                table: "invoiceitems",
                column: "InvoiceId",
                principalTable: "invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_invoices_clients_ClientId",
                table: "invoices",
                column: "ClientId",
                principalTable: "clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_invoiceitems_invoices_InvoiceId",
                table: "invoiceitems");

            migrationBuilder.DropForeignKey(
                name: "FK_invoices_clients_ClientId",
                table: "invoices");

            migrationBuilder.DropIndex(
                name: "IX_invoices_ClientId",
                table: "invoices");

            migrationBuilder.DropIndex(
                name: "IX_invoiceitems_InvoiceId",
                table: "invoiceitems");

            migrationBuilder.DropColumn(
                name: "isArchived",
                table: "invoices");

            migrationBuilder.DropColumn(
                name: "templateName",
                table: "invoices");

            migrationBuilder.AddColumn<int>(
                name: "TemplateId",
                table: "invoices",
                type: "int",
                nullable: true);
        }
    }
}
