import { useLanguage } from '../LanguageContext';

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      text: t('testimonials.testimonial1.text'),
      author: t('testimonials.testimonial1.author'),
      location: t('testimonials.testimonial1.location'),
      rating: 5
    },
    {
      text: t('testimonials.testimonial2.text'),
      author: t('testimonials.testimonial2.author'),
      location: t('testimonials.testimonial2.location'),
      rating: 5
    },
    {
      text: t('testimonials.testimonial3.text'),
      author: t('testimonials.testimonial3.author'),
      location: t('testimonials.testimonial3.location'),
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            {t('testimonials.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-custom animate-fade-in-up">
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-primary-50 p-12 rounded-3xl">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">
              {t('testimonials.cta.title')}
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('testimonials.cta.subtitle')}
            </p>
            <button className="gradient-bg text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105">
              {t('testimonials.cta.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
