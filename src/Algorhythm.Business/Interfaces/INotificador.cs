using Algorhythm.Business.Notificacoes;
using System.Collections.Generic;

namespace Algorhythm.Business.Interfaces
{
    public interface INotificador
    {
        bool TemNotificacao();
        List<Notificacao> ObterNotificacoes();
        void Handle(Notificacao notificacao);
    }
}
