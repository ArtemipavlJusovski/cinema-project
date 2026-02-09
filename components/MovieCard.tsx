import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
};

export default function MovieCard({
  id,
  title,
  description,
  posterUrl,
}: Props) {
  return (
    <Link href={`/movies/${id}`} className="group">
      <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer">
        <Image
          src={posterUrl}
          alt={title}
          width={500}
          height={750}
          className="w-full h-auto object-cover group-hover:scale-105 transition"
        />

        <div className="bg-gradient-to-t from-black via-transparent px-4 py-6 absolute bottom-0 w-full">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-gray-300 text-sm mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}
