// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

import {
  type BodyLoginLoginAccessToken as AccessToken,
  type UserPublic,
  type UserRegister,
} from "../client"
import { LoginService, UsersService } from "../core/sdk.gen"
import { type ApiError } from "../core/ApiError"
import { handleError } from "../utils"

const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null
}

const useAuth = () => {
  const [error, setError] = useState<string | null>(null)
  // const navigate = useNavigate()
  // const queryClient = useQueryClient()
  const user = null //FIXME: Replace with actual user fetching logic
  // const { data: user } = useQuery<UserPublic | null, Error>({
  //   queryKey: ["currentUser"],
  //   queryFn: UsersService.readUserMe,
  //   enabled: isLoggedIn(),
  // })

  // const signUpMutation = useMutation({
  //   mutationFn: (data: UserRegister) =>
  //     UsersService.registerUser({ requestBody: data }),

  //   onSuccess: () => {
  //     navigate({ to: "/login" })
  //   },
  //   onError: (err: ApiError) => {
  //     handleError(err)
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["users"] })
  //   },
  // })

  const login = async (data: AccessToken) => {
    const response = await LoginService.loginAccessToken({
      formData: data,
    })
    localStorage.setItem("access_token", response.access_token)
  }

  // const loginMutation = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => {
  //     navigate({ to: "/" })
  //   },
  //   onError: (err: ApiError) => {
  //     handleError(err)
  //   },
  // })

  const logout = () => {
    localStorage.removeItem("access_token")
    // navigate({ to: "/login" })
  }

  return {
    // signUpMutation,
    // loginMutation,
    logout,
    user,
    error,
    resetError: () => setError(null),
  }
}

export { isLoggedIn }
export default useAuth
