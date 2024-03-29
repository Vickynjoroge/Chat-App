import { useState } from "react"
import toast from "react-hot-toast"

const useSignup = () => {
        const [loading, setIsLoading] = useState(false)

        const signup = async ({fullName, username, password,
            confirmPassword, gender}) => {
            const success = handleInputErrors({fullName, username, password,
                confirmPassword, gender})

                setIsLoading(true)
                if(!success) return;

                try {
                    const res = await fetch("/api/auth/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({fullName, username, password,
                            confirmPassword, gender})
                    })

                    const data = await res.json()
                    if(data.error) {
                    throw new Error(data.error)
                }
                } catch (error) {
                    toast.error(error.message)
                } finally {
                    setIsLoading(false)
                }
        };

        return { loading, signup }
    }


export default useSignup

function handleInputErrors({fullName, username, password,
    confirmPassword, gender}) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields")
        return false
    }

    if(password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false
    }

    if(password.length < 6) {
        toast.error("Passwords must be at least 6 characters")
        return false
    }
    return true
}