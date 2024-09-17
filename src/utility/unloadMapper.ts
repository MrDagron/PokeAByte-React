
export function unloadMapper() {
  fetch(
    "http://localhost:8085/mapper-service/unload-mapper", 
    { method: "PUT", headers: { "Content-Type": "application/json" } }
  );
}