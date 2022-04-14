using Algorhythm.Api.Extensions;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Algorhythm.Api.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly AppSettings _appSettings;

        public EmailSender(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            await Execute(_appSettings.Email, _appSettings.Password, subject, htmlMessage, email);
        }

        public async Task Execute(string apiEmail, string apiPassword, string subject, string message, string toEmail)
        {

            MailMessage mailMessage = new(apiEmail, toEmail, subject, message);

            SmtpClient smtpClient = new("smtp.gmail.com", 587)
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(apiEmail, apiPassword)
            };
            try
            {
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
