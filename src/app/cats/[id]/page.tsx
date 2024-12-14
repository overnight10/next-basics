import Image from "next/image";

export default function Cat({id}: {id: string}) {
  return (
    <div>
      <h1>Cat with id {id}</h1>
    </div>
  );
}
