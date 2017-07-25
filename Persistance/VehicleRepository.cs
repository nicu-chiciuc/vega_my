using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Models;
using vega.Persistance;
using vega.Core;

namespace vega.Persistance
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }
        public async Task<Vehicle> GetVehicle (int id, bool includeRelated)
        {
            if (includeRelated)
                return await context.Vehicles
                    .Include(v => v.Features)
                        .ThenInclude(vf => vf.Feature)
                    .Include(v => v.Model)
                        .ThenInclude(m => m.Make)
                    .SingleOrDefaultAsync(v => v.Id == id);
            else
                return await context.Vehicles.FindAsync(id);
        }

        public void Add (Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove (Vehicle vehicle)
        {
            context.Remove(vehicle);
        }
    }
}