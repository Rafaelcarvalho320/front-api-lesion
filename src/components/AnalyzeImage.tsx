// src/components/AnalyzeImage.tsx
import { useState, FormEvent } from 'react';
import { analyzeImage } from '@/lib/api';
import styles from '@/styles/AnalyzeImage.module.css';
import { AnalysisResult } from '@/types';

export default function AnalyzeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, selecione uma imagem.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await analyzeImage(formData);
      setResult(response.data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError('Erro ao analisar a imagem: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const getResultIcon = (isBenign: boolean) => {
    return isBenign ? (
      <span className={styles.checkIcon}>✔ </span>
    ) : (
      <span className={styles.crossIcon}>✘ </span>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Análise de Imagem de Lesão</h1>
      <p className={styles.description}>
        Faça o upload de uma imagem de lesão para análise de simetria, borda e coloração.
      </p>

      <div className={styles.uploadContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {preview && <img src={preview} alt="Pré-visualização" className={styles.preview} />}
          <label className={styles.uploadLabel}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.inputFile}
            />
            Upload da Imagem
          </label>
          <button
            type="submit"
            className={loading ? styles.submitButtonDisabled : styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Analisando...' : 'Analisar Imagem'}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
      </div>

      {result && (
        <div className={styles.resultContainer}>
          <h2 className={styles.resultTitle}>Resultado da Análise</h2>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>Simetria</span>
            <span className={styles.resultValue}>
              {result.symmetry} {getResultIcon(result.symmetry.includes('Simétrica'))}
            </span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>Borda</span>
            <span className={styles.resultValue}>
              {result.border.resultado} {getResultIcon(result.border.resultado.includes('Benignas'))}
            </span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>Coloração</span>
            <span className={styles.resultValue}>
              {result.coloration.resultado} {getResultIcon(result.coloration.resultado.includes('benignas'))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}