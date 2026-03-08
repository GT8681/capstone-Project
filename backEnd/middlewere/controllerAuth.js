export const isPartner = (req, res, next) => {
    // Stampiamo il ruolo per debuggare nei log di Render
    console.log("Ruolo utente che prova la PATCH:", req.user.role);

    const ruoliAmmessi = ['PatnerPro', 'Patner', 'user', 'admin'];

    if (ruoliAmmessi.includes(req.user.role)) {
        next();
    } else {
        res.status(403).json({ message: "Accesso negato: ruolo non autorizzato" });
    }
};