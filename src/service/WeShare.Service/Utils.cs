using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeShare.Service
{
    public static class Utils
    {
        private static readonly Random rnd = new Random(DateTime.Now.Millisecond);

        public static IEnumerable<T> RandomizeOrder<T>(this IEnumerable<T> source)
            where T : class
        {
            var array = source.ToArray();
            var list = new List<T>();
            while (!array.All(x => x is null))
            {
                var idx = rnd.Next(array.Length);
                if (!(array[idx] is null))
                {
                    list.Add(array[idx]);
                    array[idx] = null;
                }
            }
            return list;
        }
    }
}
