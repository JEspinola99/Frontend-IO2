import { ErrorMessage } from "@hookform/error-message";
import { FormLabel, FormControl } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import FormValidationError from "./FormValidationError";
import { InputValidated } from "@/interfaces/inputValidated/inputValidated";

export default function InputValidated({name, type='text', label}:InputValidated) {

    const { formState: { errors } } = useFormContext()

    return (
        <>
            <Controller name={name} render={({ field }) => (
                <>
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <FormControl
                        id={name}
                        type={type}
                        {...field}
                    />
                </>
            )} />

            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => <FormValidationError message={message} />}
            />
        </>
    )
}