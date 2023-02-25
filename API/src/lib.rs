use sqlx::PgPool;
use std::net::SocketAddr;
use shuttle_secrets::SecretStore;

mod router;
use router::create_router;

#[shuttle_service::main]
async fn main(
    #[shuttle_shared_db::Postgres] postgres: PgPool,
    #[shuttle_secrets::Secrets] _secrets: SecretStore
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
        self.init_router(addr).await.expect("There was an error trying to create the router!");

        Ok(())
    }
}

impl CustomService {
    async fn init_router(&self, addr: std::net::SocketAddr) -> Result<(), hyper::Error> {
        let meme = create_router(self.postgres.clone());

        let bound_server = axum::Server::bind(&addr).serve(meme.into_make_service());

        bound_server.await
    }
}
