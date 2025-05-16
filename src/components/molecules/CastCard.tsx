import { CastMember } from "../../types/movie";
import { useImageConfig } from "../../contexts/ImageConfigContext";

type CastCardProps = {
  castMember: CastMember;
};

const CastCard = ({ castMember }: CastCardProps) => {
  const { getImageUrl } = useImageConfig();

  return (
    <div
      key={castMember.id}
      className="group flex-none rounded-lg shadow-sm transition-all hover:shadow-md w-[140px] overflow-hidden border border-gray-200 hover:border-gray-300"
    >
      <a href={`#`} className="block">
        <div className="h-[170px] overflow-hidden bg-gray-200">
          <img
            src={getImageUrl(castMember.profile_path, "profile", "sm")}
            alt={`${castMember.name} profile`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 overflow-hidden"
            loading="lazy"
          />
        </div>
        <div className="p-2">
          <h4 className="line-clamp-2 font-semibold">{castMember.name}</h4>
          <h5 className="line-clamp-2 font-light">{castMember.character}</h5>
        </div>
      </a>
    </div>
  );
};

export default CastCard;
