import Image from 'next/image';

export default function DoctorCard({ doctor }) {
    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 flex flex-col gap-3">
            <div className="flex items-center gap-4">
                {console.log("CHECK", doctor)}
                
                <img
                    src={doctor.photo}
                    alt={doctor.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                />
                <div>
                    <h2 className="text-lg font-semibold">{doctor.name}</h2>
                    <p className="text-sm text-gray-600">
                        {doctor.specialities.map((s) => s.name).join(', ')}
                    </p>
                </div>
            </div>

            <p className="text-sm text-gray-700">{doctor.doctor_introduction}</p>

            <div className="text-sm flex flex-col gap-1">
                <div>
                    <span className="font-medium">Clinic:</span>{' '}
                    {doctor.clinic.name}, {doctor.clinic.address.locality}
                </div>
                <div>
                    <span className="font-medium">Experience:</span> {doctor.experience}
                </div>
                <div>
                    <span className="font-medium">Languages:</span>{' '}
                    {doctor.languages.join(', ')}
                </div>
                <div>
                    <span className="font-medium">Fees:</span> {doctor.fees}
                </div>
            </div>

            <div className="flex gap-4 mt-2">
                {doctor.video_consult && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        Video Consult Available
                    </span>
                )}
                {doctor.in_clinic && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        In-Clinic Available
                    </span>
                )}
            </div>

            <button
                className="mt-4 border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-slate-100 transition"
                onClick={() => alert(`Booking appointment with Dr. ${doctor.name}`)}
            >
                Book Appointment
            </button>
        </div>
    );
}
