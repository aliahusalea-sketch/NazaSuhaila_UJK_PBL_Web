interface StudentStatsProps {
  total: number;
  ipa: number;
  ips: number;
}

export default function StudentStats({ total, ipa, ips }: StudentStatsProps) {
  const cards = [
    {
      title: "Total Siswa",
      value: total,
      description: "Seluruh siswa terdaftar",
      color: "blue",
      icon: "👨‍🎓",
    },
    {
      title: "Jurusan IPA",
      value: ipa,
      description: "Siswa jurusan IPA",
      color: "emerald",
      icon: "🔬",
    },
    {
      title: "Jurusan IPS",
      value: ips,
      description: "Siswa jurusan IPS",
      color: "violet",
      icon: "🌍",
    },
  ];

  const styles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
    violet: "bg-violet-50 text-violet-700",
  };

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>

              <h2 className="mt-3 text-3xl font-bold text-slate-800">
                {card.value}
              </h2>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${styles[card.color]}`}
            >
              {card.icon}
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400">{card.description}</p>
        </div>
      ))}
    </section>
  );
}
