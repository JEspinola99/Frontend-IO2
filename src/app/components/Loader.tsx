import { FidgetSpinner } from "react-loader-spinner"

export const Loader = () => {
    return (
        <div className="d-flex align-middle justify-center">
            <FidgetSpinner
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                ballColors={['#ff0000', '#00ff00', '#0000ff']}
                backgroundColor="#F4442E"
            />
        </div>
    )
}