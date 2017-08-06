using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;
using System.Linq;
using System.Collections.Generic;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(v => v.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(v => v.Features, opt => opt.MapFrom(v => v.Features.Select(f => f.FeatureId)));

            CreateMap<Vehicle, VehicleResource>()
                .ForMember(v => v.Make, opt => opt.MapFrom(v => v.Model.Make))
                .ForMember(v => v.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(v => v.Features, opt =>
                    opt.MapFrom(v =>
                        v.Features.Select(f =>
                            new KeyValuePairResource
                            {
                                Id = f.Feature.Id,
                                Name = f.Feature.Name
                            }
                            )));





            // API Resource to Domain

            CreateMap<VehicleQueryResource, VehicleQuery>();
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {

                    // remove unselected features
                    var removedFeatures = v.Features
                        .Where(f => !vr.Features.Contains(f.FeatureId));

                    foreach (var f in removedFeatures.ToList())
                        v.Features.Remove(f);

                    // add newly selected features
                    var addedFeatures = vr.Features
                        .Where(fid => !v.Features.Any(f => f.FeatureId == fid))
                        .Select(id => new VehicleFeature { FeatureId = id });

                    foreach (var f in addedFeatures.ToList())
                        v.Features.Add(f);
                });
        }
    }
}