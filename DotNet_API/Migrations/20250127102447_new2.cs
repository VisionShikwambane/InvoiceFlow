using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNet_API.Migrations
{
    /// <inheritdoc />
    public partial class new2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "templateName",
                table: "invoices");

            migrationBuilder.AddColumn<int>(
                name: "InvoiceTemplateId",
                table: "invoices",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TemplateId",
                table: "invoices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InvoiceTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TemplatePath = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Preview = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Tags = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceTemplates", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_invoices_InvoiceTemplateId",
                table: "invoices",
                column: "InvoiceTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_invoices_InvoiceTemplates_InvoiceTemplateId",
                table: "invoices",
                column: "InvoiceTemplateId",
                principalTable: "InvoiceTemplates",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_invoices_InvoiceTemplates_InvoiceTemplateId",
                table: "invoices");

            migrationBuilder.DropTable(
                name: "InvoiceTemplates");

            migrationBuilder.DropIndex(
                name: "IX_invoices_InvoiceTemplateId",
                table: "invoices");

            migrationBuilder.DropColumn(
                name: "InvoiceTemplateId",
                table: "invoices");

            migrationBuilder.DropColumn(
                name: "TemplateId",
                table: "invoices");

            migrationBuilder.AddColumn<string>(
                name: "templateName",
                table: "invoices",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
