using Algorhythm.Api.Extensions;
using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Notifications;
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
        private readonly INotifier _notifier;

        public EmailSender(IOptions<AppSettings> appSettings, INotifier notifier)
        {
            _appSettings = appSettings.Value;
            _notifier = notifier;
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
                _notifier.Handle(new Notification("Algo deu errado no envio de e-mail"));
            }
        }
    }
}
