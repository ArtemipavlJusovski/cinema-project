import { notFound } from "next/navigation";
import Link from "next/link";

const movies = [
  {
    id: "1",
    title: "Интерстеллар",
    description:
      "В будущем климатические изменения привели к катастрофическому снижению урожайности и вымиранию самых распространенных сельскохозяйственных культур. Население страдает от голода и болезней на покрытой песком Земле, а бывший пилот Купер, как и большинство американцев, вынужден был бросить карьеру, чтобы заняться фермерством. Однажды его дочь Мёрфи пугается призрака в собственной спальне, оставившего ей закодированное сообщение. Сначала отец не верит девочке, но вскоре вместе они расшифровывают код и, следуя подсказкам, находят секретную базу НАСА, где ученые занимаются созданием уникального космического корабля, способного пролететь через черную дыру и достичь пригодной для обитания планеты, способной стать новым домом для всего человечества...",
    posterUrl: "/posters/interstellar.jpg",
    sessions: {
      "2025-02-01": ["12:00", "15:30", "18:00", "21:30"],
      "2025-02-02": ["14:00", "17:30", "20:00"],
    },
  },
  {
    id: "2",
    title: "Начало",
    description:
      "Мы привыкли, что в нашем понимании вор – это человек способный украсть какие-то ценности или деньги. Сюжет картины рассказывает о ворах, способных украсть идею прямо у человека из подсознания. Одним из таких является главный герой фильма Доминик Кобб. После того, как его жена умерла, он вынужден скрываться, и не может даже вернуться в страну, чтобы повидать детей. Как-то раз Кобб получает очень неординарный заказ: ему нужно не украсть, а наоборот внедрить новую идею в подсознание человека. Доминику не очень хочется браться за это дело, но заказчик в обмен предлагает возможность вернуться домой. Заручившись поддержкой профессионалов этого дела, Кобб начинает разрабатывать план, как все провернуть. Все нужно очень хорошо продумать, ведь ворам предстоит воссоздать многослойную реальность в подсознании объекта, в результате чего грани могут начать стираться.",
    posterUrl: "/posters/inception.jpg",
    sessions: {
      "2025-02-01": ["11:00", "14:30", "18:00", "21:00"],
      "2025-02-03": ["13:00", "16:30", "20:00"],
    },
  },
  {
    id: "3",
    title: "Джокер",
    description:
      "События развиваются в начале 1980-х годов вокруг невезучего стендап-комика Артура Флека, который живет вместе с больной матерью в небольшой квартире в Готэм-сити и страдает от редкого психического заболевания, вызывающего у него приступы неконтролируемого смеха. Когда ведущий популярного вечернего ток-шоу Мюррей Франклин публично высмеивает Флека на телевидении, а мать попадает в больницу, он больше не находит сил веселить публику своими выступлениями. Нанеся безобразный грим на лицо и взяв псевдоним Джокер, мужчина ставит перед собой новую цель: заставить страдать всех вокруг...",
    posterUrl: "/posters/joker.jpg",
    sessions: {
      "2025-02-02": ["12:15", "16:00", "20:30"],
      "2025-02-05": ["14:00", "19:00"],
    },
  },
];

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ ВАЖНО: await params
  const { id } = await params;

  const movie = movies.find((m) => m.id === id);
  if (!movie) return notFound();

  const dates = Object.keys(movie.sessions);

  return (
    <div className="relative min-h-screen text-white">
      {/* ФОН */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
        style={{ backgroundImage: `url(${movie.posterUrl})` }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* КОНТЕНТ */}
      <div className="relative z-10 px-8 py-12 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="grid md:grid-cols-[280px_1fr] gap-8 mb-12">
          <img
            src={movie.posterUrl}
            className="rounded-xl shadow-xl"
            alt={movie.title}
          />

          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-zinc-300 max-w-xl">{movie.description}</p>
          </div>
        </div>

        {/* СЕАНСЫ */}
        <section className="space-y-10">
          {dates.map((date) => (
            <div key={date}>
              <h2 className="text-2xl font-semibold mb-4">
                {new Date(date).toLocaleDateString("ru-RU", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movie.sessions[date].map((time) => {
                  const sessionId = `${movie.id}-${date}-${time}`;

                  return (
                    <Link
                      key={time}
                      href={`/movies/${movie.id}/sessions/${sessionId}`}
                    >
                      <div className="h-20 rounded-xl bg-zinc-900/80 border border-zinc-700 flex flex-col items-center justify-center hover:bg-red-600 hover:border-red-500 transition">
                        <span className="text-lg font-semibold">{time}</span>
                        <span className="text-xs text-zinc-400">
                          Выбрать места
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
