const fetchPreguntas = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/preguntas/');
        if (!response.ok) {
            throw new Error('Error al obtener las preguntas');
        }
        const data = await response.json();
        console.log('Preguntas obtenidas:', data.results);
        return data;
    } catch (error) {
        console.error('Error fetching preguntas:', error);
        return [];
    }
};
export default fetchPreguntas;
