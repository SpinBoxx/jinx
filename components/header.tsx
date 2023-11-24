interface Props {
  data: {
    title: string;
    description?: string;
    nbItem?: number;
  };
}

const Header = ({ data }: Props) => {
  return (
    <div>
      <div className="flex items-end gap-x-2">
        <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
          {data.title}{" "}
        </h2>
        {data.nbItem !== undefined ? (
          <span className="font-normal text-muted-foreground">
            ({data.nbItem})
          </span>
        ) : null}
      </div>

      <p className="text-sm tracking-tight text-muted-foreground">
        {data.description}
      </p>
    </div>
  );
};

export default Header;
