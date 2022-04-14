using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Algorhythm.Api.Extensions
{
    public class AppSettings
    {
        /// <summary>
        /// chave de criptografia do token
        /// </summary>
        public string Secret { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        /// <summary>
        /// Tempo válido em horas do token
        /// </summary>
        public int ExpirationHours { get; set; }

        /// <summary>
        /// Emissor do token
        /// </summary>
        public string Issuer { get; set; }

        /// <summary>
        /// Indica em quais urls o token é valido 
        /// </summary>
        public string ValidOn { get; set; }
    }
}
