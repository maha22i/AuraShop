import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { sendContactEmail } from "../services/emailService";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-sky-100">
            Notre équipe est à votre disposition pour répondre à toutes vos
            questions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Nos coordonnées
            </h2>
            <div className="space-y-6">
              <div className="flex items-start group hover:scale-105 transition-all">
                <Phone className="w-6 h-6 text-sky-600 group-hover:text-sky-700 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Téléphone</h3>
                  <p className="text-gray-600">+253 77 55 20 28</p>
<<<<<<< HEAD
                  <p className="text-gray-600">+33 07 75 84 09 62</p>
=======
                  <p className="text-gray-600">+253 77 30 70 51</p>
>>>>>>> 23af5a2 (amelioration des quelque pages et supression des clés firebase)
                </div>
              </div>
              <div className="flex items-start group hover:scale-105 transition-all">
                <Mail className="w-6 h-6 text-sky-600 group-hover:text-sky-700 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">djibouti.aura@gmail.com </p>
                </div>
              </div>
              <div className="flex items-start group hover:scale-105 transition-all">
                <MapPin className="w-6 h-6 text-sky-600 group-hover:text-sky-700 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Adresse</h3>
                  <p className="text-gray-600">Quartier Hodan 1 à Balbala - Djibouti</p>
                </div>
              </div>
              <div className="flex items-start group hover:scale-105 transition-all">
                <Clock className="w-6 h-6 text-sky-600 group-hover:text-sky-700 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Horaires</h3>
                  <p className="text-gray-600">Tous les jours: 7/7j - 24/24j</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Envoyez-nous un message
            </h2>
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
                Message envoyé avec succès ! Nous vous répondrons dans les plus
                brefs délais.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                Une erreur est survenue. Veuillez réessayer plus tard.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition-all"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition-all"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition-all"
                  placeholder="votre numéro de téléphone"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition-all"
                  placeholder="Votre message..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-sky-600 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition-all ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
