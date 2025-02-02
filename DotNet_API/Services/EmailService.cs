using AutoMapper;
using DinkToPdf.Contracts;
using DotNet_API.DatabaseContext;
using DotNet_API.Repositories;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace DotNet_API.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;

        }

        public async Task SendEmailAsync(string toEmail, string subject, string htmlBody)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Test", "visionvee201@gmail.com"));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = htmlBody
            };
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                try
                {
                    client.Timeout = 60000; // Set timeout to 60 seconds
                    await client.ConnectAsync(emailSettings["SmtpServer"], int.Parse(emailSettings["Port"]), SecureSocketOptions.Auto);
                    await client.AuthenticateAsync(emailSettings["Username"], emailSettings["Password"]);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                    Console.WriteLine("Email sent successfully!");
                }
                catch (SmtpCommandException smtpEx)
                {
                    Console.WriteLine($"SMTP Error: {smtpEx.StatusCode} - {smtpEx.Message}");
                }
                catch (SmtpProtocolException protocolEx)
                {
                    Console.WriteLine($"Protocol Error: {protocolEx.Message}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"General Error: {ex.Message}");
                }
            }
        }




    }
}
