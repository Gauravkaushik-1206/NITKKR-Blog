import { Quote } from "../components/Quote";
import { SignUpForm } from "../components/SignUpForm";


export function Signup() {
  return (

    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <SignUpForm></SignUpForm>
        </div>
        <div className="invisible lg:visible">
        <Quote></Quote>
        </div>
    </div>
  )
}
