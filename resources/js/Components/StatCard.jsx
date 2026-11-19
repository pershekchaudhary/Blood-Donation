export default function StatCard({ label, value }) {
    return (
        <div className="rounded-[10px] border border-[#E4E2DD] bg-white p-5">
            <div className="text-[13px] text-[#5B6068]">{label}</div>
            <div className="text-[28px] font-bold text-[#B3261E]">{value}</div>
        </div>
    );
}
