import { useEffect, useState } from "react";
import { userInitials } from "../../utils/userInitials";
const useFileDataUrl = (file) => {
  try {
    const [url, setUrl] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!file) return;
      let aborted = false;
      const reader = new FileReader();
      reader.onload = () => !aborted && setUrl(reader.result);
      reader.readAsDataURL(file.files[0]);
      return () => {
        aborted = true;
      };
    }, [file]);
    return {
      url,
    };
  } catch (error) {
    console.log(error);
  }
};
const Avatar = (prop) => {
  const [hasImage, setHasImage] = useState(false);
  const [style, setStyle] = useState({ display: "none" });

  const { url } = useFileDataUrl(prop?.files);

  return (
    <>
      <img
        src={url || prop.avatar}
        alt="avatar"
        style={style}
        onLoad={() => {
          setHasImage(true);
          setStyle({ display: "block" });
        }}
        accept="image/*"
        className="img"
      />
      {!hasImage && (
        <h1
          style={{
            textAlign: "center",
            placeSelf: "center",
            margin: "0 auto",
            color: "var(--white)",
          }}
        >
          {userInitials(prop.name)}
        </h1>
      )}
    </>
  );
};

export default Avatar;
