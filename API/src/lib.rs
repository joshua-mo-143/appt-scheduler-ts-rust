use axum::{routing::get, Router};
use sqlx::PgPool;
use std::net::SocketAddr;
use shuttle_secrets::SecretStore;

mod router;
use router::hello_world;

#[shuttle_service::main]
async fn main(
    #[shuttle_shared_db::Postgres] postgres: PgPool,
    #[shuttle_secrets::Secrets] secrets: SecretStore
) -> Result<CustomService, shuttle_service::error::Error> {
    Ok(CustomService { postgres })
}

pub struct CustomService {
    postgres: PgPool,
}

#[shuttle_service::async_trait]
impl shuttle_service::Service for CustomService {
    async fn bind(
        mut self: Box<Self>,
        addr: SocketAddr,
    ) -> Result<(), shuttle_service::error::Error> {
        self.init_router(addr).await;

        Ok(())
    }
}

impl CustomService {
    async fn init_router(&self, addr: std::net::SocketAddr) -> Result<(), hyper::Error> {
        let meme = Router::new().route("/", get(hello_world));

        let bound_server = axum::Server::bind(&addr).serve(meme.into_make_service());

        bound_server.await
    }
}
