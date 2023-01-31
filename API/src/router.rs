use sqlx::{PgPool, Row};
use axum::{Json, response::{Response, IntoResponse}, http::StatusCode};
use std::error::Error;

pub async fn hello_world() -> &'static str {
    "Hello!"
}

async fn register() -> Result<(), Box<dyn Error>> {
    Ok(())
}

async fn login() -> Result<(), Box<dyn Error>> {
 Ok(())
}

async fn create_meeting(db_conn: PgPool, Json(meeting_details): Json<MeetingDetails>) -> Response {

   let query = sqlx::query("INSERT INTO meetings (meeting_date, start_time, finish_time, contact_email) VALUES ($1, $2, $3, $4) RETURNING id")
        .bind(meeting_details.date)
        .bind(meeting_details.start_time)
        .bind(meeting_details.finish_time)
        .bind(meeting_details.email)
            .map(|row| row.get("id"))
            .fetch_one(&db_conn)
            .await;

    let id = match query {
        Ok(id) => id,
        Err(_) => {
            return (StatusCode::INTERNAL_SERVER_ERROR, "An unexpected error has occurred").into_response()
        }
    };

    StatusCode::CREATED.into_response()
}

pub struct MeetingDetails {
    email: String,
    date: String,
    start_time: String,
    finish_time: String,
}

pub struct MeetingDetailsResponse {
    id: String
}