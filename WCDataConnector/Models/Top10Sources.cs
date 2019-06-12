using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WCDataConnector.Models
{
    public class Top10Sources
    {
        [JsonProperty("destination")]
        public string Source { get; set; }
        [JsonProperty("count")]
        public int Count { get; set; }

        public Top10Sources(string s, string c)
        {
            Source = s;

            int temp = 0;
            Int32.TryParse(c, out temp);

            Count = temp;
        }
    }
}
