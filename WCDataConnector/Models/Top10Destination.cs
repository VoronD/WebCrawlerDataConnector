using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WCDataConnector.Models
{
    public class Top10Destination
    {
        
        [JsonProperty("destination")]
        public string Destination { get; set; }
        [JsonProperty("count")]
        public int Count { get; set; }

        public Top10Destination(string dest, string c)
        {
            Destination = dest;

            int temp = 0;
            Int32.TryParse(c, out temp);

            Count = temp;
        }
    }
}
