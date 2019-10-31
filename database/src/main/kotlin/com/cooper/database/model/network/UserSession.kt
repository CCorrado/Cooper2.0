package com.cooper.database.model.network

import com.google.gson.annotations.SerializedName
import java.util.*

data class UserSession(
        val userId: String?,
        val sessionId: Long?,
        val role: String?,
        val name: String?,
        val username: String?,
        val userCreatedDate: Date?,
        val sessionCreatedDate: Date?,
        val password: String?,
        
        @SerializedName("refresh_token")
        val refreshToken: String?,

        @SerializedName("access_token")
        val accessToken: String?,

        @SerializedName("expires_in")
        val expiresIn: Long?,

        @SerializedName("token_type")
        val tokenType: String?
)
