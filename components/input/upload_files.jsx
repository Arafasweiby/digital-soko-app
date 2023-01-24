import { useField } from "formik";
import Image from "next/image";
import { BiUpload } from "react-icons/bi";
import { HiOutlineDocumentPlus, HiDocument } from "react-icons/hi2";

export default function UploadFilesField({ label, name, id }) {
  const [field, meta] = useField({ name });

  return (
    <div>
      <p className="block text-sm font-medium text-gray-700">{label}</p>
      <label
        htmlFor={id}
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
      >
        <div className="space-y-1 ">
          <div className="grid place-items-center">
            {field.value.length === 1 ? (
              <HiDocument className="w-10 h-10 text-soko-blue" />
            ) : (
              <HiOutlineDocumentPlus className="w-10 h-10" />
            )}
          </div>
          <div className="flex text-sm text-gray-600 text-center">
            {field.value.length === 1 ? (
              <p className="text-soko-blue font-medium">
                {field.value[0].name}
              </p>
            ) : (
              <p>Browse files</p>
            )}

            <input
              id={id}
              type="file"
              accept="doc/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files[0];
                field.onChange({
                  target: { value: [file], name },
                });
              }}
            />
          </div>
        </div>
      </label>
      <p className="text-xs text-gray-500 mt-2">Supported formats: Word, PDF</p>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-1">
      <p className="font-medium text-lipad-blue">{label}</p>
      <label
        htmlFor={id}
        className="inline-block w-full cursor-pointer border-2 border-dashed border-lipad-green bg-lipad-green bg-opacity-5"
      >
        <div className="flex flex-col items-center p-4 text-center font-medium text-lipad-green">
          {field.value.length > 0 ? (
            <div className="relative h-24 w-24 overflow-hidden rounded-full border">
              <Image
                src={URL.createObjectURL(field.value[0])}
                alt=""
                objectFit="cover"
                layout="fill"
              />
            </div>
          ) : (
            <BiUpload className="h-8 w-8 " />
          )}
          {field.value.length > 0 ? (
            <p>Change client logo</p>
          ) : (
            <p>Upload client logo</p>
          )}
        </div>
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files[0];
          field.onChange({
            target: { value: [file], name },
          });
        }}
      />
      {meta.touched && meta.error && (
        <p className="text-red-500">{meta.error}</p>
      )}
    </div>
  );
}
