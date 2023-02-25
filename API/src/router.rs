use serde::{Serialize, Deserialize};
use sqlx::{PgPool};
use axum::{extract::{State}, Json, Router, response::{IntoResponse}, http::StatusCode, routing::{get, post}};
use std::sync::Arc;

pub struct RouterState {
    postgres: PgPool
}
pub fn create_router(postgres: PgPool) -> Router {

    let meme = Arc::new(RouterState {postgres});

    Router::new()
            .route("/", get(hello_world))
            .route("/meetings/create", post(create_meeting))
            .with_state(meme)
}

pub async fn hello_world() -> &'static str {
    "Hello!"
}

pub async fn create_meeting(State(state): State<Arc<RouterState>>, Json(meeting_details): Json<MeetingDetails>) -> impl IntoResponse {

    let meme = sqlx::query("INSERT INTO meetings (meeting_date, start_time, finish_time, contact_email) VALUES ($1, $2, $3, $4) RETURNING id")
        .bind(meeting_details.date)
        .bind(meeting_details.start_time)
        .bind(meeting_details.finish_time)
        .bind(meeting_details.email)
            .execute(&state.postgres)
            .await;

    match meme {
        Ok(_) => (StatusCode::CREATED, format!("Successfully created!")),
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, format!("Something went wrong: {err}"))
    }
}

#[derive(Serialize, Deserialize)]
pub struct MeetingDetails {
    email: String,
    date: String,
    start_time: String,
    finish_time: String,
}