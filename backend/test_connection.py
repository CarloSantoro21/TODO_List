from app.database import get_supabase_client

def test_supabase_connection():
    try:
        supabase = get_supabase_client()
        
        # Probar conexión básica
        result = supabase.table('todos').select("*").limit(1).execute()
        
        print("Conexión exitosa con Supabase!")
        print(f"Datos encontrados: {len(result.data)} registros")

        if result.data:
            print(f"Primer TODO: {result.data[0]}")
        else:
            print("La tabla está vacía")

        return True
        
    except Exception as e:
        print(f"Error de conexión: {e}")
        return False

if __name__ == "__main__": # Solo ejecutar si este archivo es el principal, no si se importa
    test_supabase_connection()