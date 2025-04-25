import DoctorCard from "./DoctorCard";

export default function DoctorsList({ doctors }) {
    return (
        <div className="flex flex-col gap-4 p-4">
        {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
        </div>
    );
    }