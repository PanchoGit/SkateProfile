using System.Collections.Generic;

using DataModel;

namespace AppWeb.Models
{
    public class SkateModel
    {
        public IEnumerable<SkateEntity> Skaters { get; set; }
    }
}