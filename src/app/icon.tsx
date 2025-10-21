import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
        }}
      >
        {/* Simple shield icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L4 6V12C4 16.5 7 20.5 12 22C17 20.5 20 16.5 20 12V6L12 2Z"
            fill="#fff"
          />
          <path
            d="M12 7L8 9.5V13C8 15.5 9.5 17.5 12 18.5C14.5 17.5 16 15.5 16 13V9.5L12 7Z"
            fill="#000"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
